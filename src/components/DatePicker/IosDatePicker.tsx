//
// import React, { useState, useRef, useEffect, useCallback } from 'react';
//
// interface EasingFunctions {
//     easeOutCubic: (pos: number) => number;
//     easeOutQuart: (pos: number) => number;
// }
//
// const easing: EasingFunctions = {
//     easeOutCubic: (pos: number) => Math.pow(pos - 1, 3) + 1,
//     easeOutQuart: (pos: number) => -(Math.pow(pos - 1, 4) - 1),
// };
//
// interface SourceItem {
//     value: number;
//     text: string;
// }
//
// interface IosSelectorOptions {
//     el: string;
//     type: 'infinite' | 'normal';
//     count: number;
//     sensitivity: number;
//     source: SourceItem[];
//     value: number | null;
//     onChange: ((selected: SourceItem) => void) | null;
// }
//
// class IosSelector {
//     private options: IosSelectorOptions;
//     private halfCount: number;
//     private quarterCount: number;
//     private a: number;
//     private minV: number;
//     private selected: SourceItem;
//     private exceedA: number;
//     private moveT: number;
//     private moving: boolean;
//     private itemHeight!: number;
//     private itemAngle!: number;
//     private radius!: number;
//     private scroll!: number;
//     private source: SourceItem[];
//     private elems: {
//         el: HTMLElement | null;
//         circleList: HTMLElement | null;
//         circleItems: NodeListOf<Element> | null;
//         highlight: HTMLElement | null;
//         highlightList: HTMLElement | null;
//         highlightitems: NodeListOf<Element> | null;
//     };
//     private events: {
//         touchstart: ((e: Event) => void) | null;
//         touchmove: ((e: Event) => void) | null;
//         touchend: ((e: Event) => void) | null;
//     };
//
//     constructor(options: Partial<IosSelectorOptions>) {
//         const defaults: IosSelectorOptions = {
//             el: '',
//             type: 'infinite',
//             count: 20,
//             sensitivity: 0.8,
//             source: [],
//             value: null,
//             onChange: null,
//         };
//
//         this.options = { ...defaults, ...options };
//         this.options.count = this.options.count - (this.options.count % 4);
//         Object.assign(this, this.options);
//
//         this.halfCount = this.options.count / 2;
//         this.quarterCount = this.options.count / 4;
//         this.a = this.options.sensitivity * 10;
//         this.minV = Math.sqrt(1 / this.a);
//         this.selected = this.options.source[0] || { value: 0, text: '' };
//         this.exceedA = 10;
//         this.moveT = 0;
//         this.moving = false;
//         this.source = [];
//
//         this.elems = {
//             el: null,
//             circleList: null,
//             circleItems: null,
//             highlight: null,
//             highlightList: null,
//             highlightitems: null,
//         };
//
//         this.events = {
//             touchstart: null,
//             touchmove: null,
//             touchend: null,
//         };
//
//         if (this.options.el) {
//             const element = document.querySelector(this.options.el) as HTMLElement;
//             if (element) {
//                 this.elems.el = element;
//                 this.itemHeight = element.offsetHeight * 3 / this.options.count;
//                 this.itemAngle = 360 / this.options.count;
//                 this.radius = this.itemHeight / Math.tan((this.itemAngle * Math.PI) / 180);
//                 this.scroll = 0;
//                 this._init();
//             }
//         }
//     }
//
//     private _init() {
//         this._create(this.options.source);
//         const touchData = {
//             startY: 0,
//             yArr: [] as [number, number][],
//             touchScroll: 0,
//         };
//
//         for (const eventName in this.events) {
//             this.events[eventName as keyof typeof this.events] = ((eventName) => {
//                 return (e: Event) => {
//                     if (this.elems.el && (this.elems.el.contains(e.target as Node) || e.target === this.elems.el)) {
//                         e.preventDefault();
//                         if (this.source.length) {
//                             (this as any)[`_${eventName}`](e, touchData);
//                         }
//                     }
//                 };
//             })(eventName);
//         }
//
//         if (this.elems.el) {
//             this.elems.el.addEventListener('touchstart', this.events.touchstart!);
//             document.addEventListener('mousedown', this.events.touchstart!);
//             this.elems.el.addEventListener('touchend', this.events.touchend!);
//             document.addEventListener('mouseup', this.events.touchend!);
//         }
//
//         if (this.source.length) {
//             this.options.value = this.options.value !== null ? this.options.value : this.source[0].value;
//             this.select(this.options.value);
//         }
//     }
//
//     private _touchstart(e: TouchEvent | MouseEvent, touchData: any) {
//         if (this.elems.el) {
//             this.elems.el.addEventListener('touchmove', this.events.touchmove!);
//             document.addEventListener('mousemove', this.events.touchmove!);
//         }
//
//         const eventY = ('clientY' in e) ? e.clientY : (e as TouchEvent).touches[0].clientY;
//         touchData.startY = eventY;
//         touchData.yArr = [[eventY, new Date().getTime()]];
//         touchData.touchScroll = this.scroll;
//         this._stop();
//     }
//
//     private _touchmove(e: TouchEvent | MouseEvent, touchData: any) {
//         const eventY = ('clientY' in e) ? e.clientY : (e as TouchEvent).touches[0].clientY;
//         touchData.yArr.push([eventY, new Date().getTime()]);
//         if (touchData.yArr.length > 5) {
//             touchData.yArr.shift();
//         }
//
//         const scrollAdd = (touchData.startY - eventY) / this.itemHeight;
//         let moveToScroll = scrollAdd + this.scroll;
//
//         if (this.options.type === 'normal') {
//             if (moveToScroll < 0) {
//                 moveToScroll *= 0.3;
//             } else if (moveToScroll > this.source.length - 1) {
//                 moveToScroll = (this.source.length - 1) + (moveToScroll - (this.source.length - 1)) * 0.3;
//             }
//         } else {
//             moveToScroll = this._normalizeScroll(moveToScroll);
//         }
//
//         touchData.touchScroll = this._moveTo(moveToScroll);
//     }
//
//     private _touchend(e: TouchEvent | MouseEvent, touchData: any) {
//         if (this.elems.el) {
//             this.elems.el.removeEventListener('touchmove', this.events.touchmove!);
//             document.removeEventListener('mousemove', this.events.touchmove!);
//         }
//
//         let v: number;
//         if (touchData.yArr.length === 1) {
//             v = 0;
//         } else {
//             const startTime = touchData.yArr[touchData.yArr.length - 2][1];
//             const endTime = touchData.yArr[touchData.yArr.length - 1][1];
//             const startY = touchData.yArr[touchData.yArr.length - 2][0];
//             const endY = touchData.yArr[touchData.yArr.length - 1][0];
//
//             v = ((startY - endY) / this.itemHeight) * 1000 / (endTime - startTime);
//             const sign = v > 0 ? 1 : -1;
//             v = Math.abs(v) > 30 ? 30 * sign : v;
//         }
//
//         this.scroll = touchData.touchScroll;
//         this._animateMoveByInitV(v);
//     }
//
//     private _create(source: SourceItem[]) {
//         if (!source.length || !this.elems.el) {
//             return;
//         }
//
//         let template = `
//       <div class="select-wrap">
//         <ul class="select-options" style="transform: translate3d(0, 0, ${-this.radius}px) rotateX(0deg);">
//           {{circleListHTML}}
//         </ul>
//         <div class="highlight">
//           <ul class="highlight-list">
//             {{highListHTML}}
//           </ul>
//         </div>
//       </div>
//     `;
//
//         if (this.options.type === 'infinite') {
//             let concatSource = [...source];
//             while (concatSource.length < this.halfCount) {
//                 concatSource = concatSource.concat(source);
//             }
//             source = concatSource;
//         }
//         this.source = source;
//         const sourceLength = source.length;
//
//         let circleListHTML = '';
//         for (let i = 0; i < source.length; i++) {
//             circleListHTML += `<li class="select-option"
//                     style="
//                       top: ${this.itemHeight * -0.5}px;
//                       height: ${this.itemHeight}px;
//                       line-height: ${this.itemHeight}px;
//                       transform: rotateX(${-this.itemAngle * i}deg) translate3d(0, 0, ${this.radius}px);
//                     "
//                     data-index="${i}"
//                     >${source[i].text}</li>`;
//         }
//
//         let highListHTML = '';
//         for (let i = 0; i < source.length; i++) {
//             highListHTML += `<li class="highlight-item" style="height: ${this.itemHeight}px;">
//                         ${source[i].text}
//                       </li>`;
//         }
//
//         if (this.options.type === 'infinite') {
//             for (let i = 0; i < this.quarterCount; i++) {
//                 circleListHTML = `<li class="select-option"
//                       style="
//                         top: ${this.itemHeight * -0.5}px;
//                         height: ${this.itemHeight}px;
//                         line-height: ${this.itemHeight}px;
//                         transform: rotateX(${this.itemAngle * (i + 1)}deg) translate3d(0, 0, ${this.radius}px);
//                       "
//                       data-index="${-i - 1}"
//                       >${source[sourceLength - i - 1].text}</li>` + circleListHTML;
//
//                 circleListHTML += `<li class="select-option"
//                       style="
//                         top: ${this.itemHeight * -0.5}px;
//                         height: ${this.itemHeight}px;
//                         line-height: ${this.itemHeight}px;
//                         transform: rotateX(${-this.itemAngle * (i + sourceLength)}deg) translate3d(0, 0, ${this.radius}px);
//                       "
//                       data-index="${i + sourceLength}"
//                       >${source[i].text}</li>`;
//             }
//
//             highListHTML = `<li class="highlight-item" style="height: ${this.itemHeight}px;">
//                           ${source[sourceLength - 1].text}
//                       </li>` + highListHTML;
//             highListHTML += `<li class="highlight-item" style="height: ${this.itemHeight}px;">${source[0].text}</li>`;
//         }
//
//         this.elems.el.innerHTML = template
//             .replace('{{circleListHTML}}', circleListHTML)
//             .replace('{{highListHTML}}', highListHTML);
//
//         this.elems.circleList = this.elems.el.querySelector('.select-options');
//         this.elems.circleItems = this.elems.el.querySelectorAll('.select-option');
//         this.elems.highlight = this.elems.el.querySelector('.highlight');
//         this.elems.highlightList = this.elems.el.querySelector('.highlight-list');
//         this.elems.highlightitems = this.elems.el.querySelectorAll('.highlight-item');
//
//         if (this.options.type === 'infinite' && this.elems.highlightList) {
//             (this.elems.highlightList as HTMLElement).style.top = -this.itemHeight + 'px';
//         }
//
//         if (this.elems.highlight) {
//             (this.elems.highlight as HTMLElement).style.height = this.itemHeight + 'px';
//             (this.elems.highlight as HTMLElement).style.lineHeight = this.itemHeight + 'px';
//         }
//     }
//
//     private _normalizeScroll(scroll: number): number {
//         let normalizedScroll = scroll;
//         while (normalizedScroll < 0) {
//             normalizedScroll += this.source.length;
//         }
//         normalizedScroll = normalizedScroll % this.source.length;
//         return normalizedScroll;
//     }
//
//     private _moveTo(scroll: number): number {
//         if (this.options.type === 'infinite') {
//             scroll = this._normalizeScroll(scroll);
//         }
//
//         if (this.elems.circleList) {
//             (this.elems.circleList as HTMLElement).style.transform = `translate3d(0, 0, ${-this.radius}px) rotateX(${this.itemAngle * scroll}deg)`;
//         }
//
//         if (this.elems.highlightList) {
//             (this.elems.highlightList as HTMLElement).style.transform = `translate3d(0, ${-(scroll) * this.itemHeight}px, 0)`;
//         }
//
//         if (this.elems.circleItems) {
//             Array.from(this.elems.circleItems).forEach((itemElem: any) => {
//                 if (Math.abs(itemElem.dataset.index - scroll) > this.quarterCount) {
//                     itemElem.style.visibility = 'hidden';
//                 } else {
//                     itemElem.style.visibility = 'visible';
//                 }
//             });
//         }
//
//         return scroll;
//     }
//
//     private async _animateMoveByInitV(initV: number) {
//         let initScroll: number;
//         let finalScroll: number;
//         let a: number;
//         let t: number;
//         let totalScrollLen: number;
//
//         if (this.options.type === 'normal') {
//             if (this.scroll < 0 || this.scroll > this.source.length - 1) {
//                 a = this.exceedA;
//                 initScroll = this.scroll;
//                 finalScroll = this.scroll < 0 ? 0 : this.source.length - 1;
//                 totalScrollLen = initScroll - finalScroll;
//                 t = Math.sqrt(Math.abs(totalScrollLen / a));
//                 initV = a * t;
//                 initV = this.scroll > 0 ? -initV : initV;
//                 await this._animateToScroll(initScroll, finalScroll, t);
//             } else {
//                 initScroll = this.scroll;
//                 a = initV > 0 ? -this.a : this.a;
//                 t = Math.abs(initV / a);
//                 totalScrollLen = initV * t + (a * t * t) / 2;
//                 finalScroll = Math.round(this.scroll + totalScrollLen);
//                 finalScroll = finalScroll < 0 ? 0 : (finalScroll > this.source.length - 1 ? this.source.length - 1 : finalScroll);
//                 totalScrollLen = finalScroll - initScroll;
//                 t = Math.sqrt(Math.abs(totalScrollLen / a));
//                 await this._animateToScroll(this.scroll, finalScroll, t, 'easeOutQuart');
//             }
//         } else {
//             initScroll = this.scroll;
//             a = initV > 0 ? -this.a : this.a;
//             t = Math.abs(initV / a);
//             totalScrollLen = initV * t + (a * t * t) / 2;
//             finalScroll = Math.round(this.scroll + totalScrollLen);
//             await this._animateToScroll(this.scroll, finalScroll, t, 'easeOutQuart');
//         }
//
//         this._selectByScroll(this.scroll);
//     }
//
//     private _animateToScroll(initScroll: number, finalScroll: number, t: number, easingName: keyof EasingFunctions = 'easeOutQuart'): Promise<void> {
//         if (initScroll === finalScroll || t === 0) {
//             this._moveTo(initScroll);
//             return Promise.resolve();
//         }
//
//         const start = new Date().getTime() / 1000;
//         let pass = 0;
//         const totalScrollLen = finalScroll - initScroll;
//
//         return new Promise((resolve) => {
//             this.moving = true;
//             const tick = () => {
//                 pass = new Date().getTime() / 1000 - start;
//                 if (pass < t) {
//                     this.scroll = this._moveTo(initScroll + easing[easingName](pass / t) * totalScrollLen);
//                     this.moveT = requestAnimationFrame(tick);
//                 } else {
//                     resolve();
//                     this._stop();
//                     this.scroll = this._moveTo(initScroll + totalScrollLen);
//                 }
//             };
//             tick();
//         });
//     }
//
//     private _stop() {
//         this.moving = false;
//         cancelAnimationFrame(this.moveT);
//     }
//
//     private _selectByScroll(scroll: number) {
//         scroll = this._normalizeScroll(scroll) | 0;
//         if (scroll > this.source.length - 1) {
//             scroll = this.source.length - 1;
//             this._moveTo(scroll);
//         }
//         this._moveTo(scroll);
//         this.scroll = scroll;
//         this.selected = this.source[scroll];
//         this.options.value = this.selected.value;
//         if (this.options.onChange) {
//             this.options.onChange(this.selected);
//         }
//     }
//
//     updateSource(source: SourceItem[]) {
//         this._create(source);
//         if (!this.moving) {
//             this._selectByScroll(this.scroll);
//         }
//     }
//
//     select(value: number) {
//         for (let i = 0; i < this.source.length; i++) {
//             if (this.source[i].value === value) {
//                 cancelAnimationFrame(this.moveT);
//                 const initScroll = this._normalizeScroll(this.scroll);
//                 const finalScroll = i;
//                 const t = Math.sqrt(Math.abs((finalScroll - initScroll) / this.a));
//                 this._animateToScroll(initScroll, finalScroll, t);
//                 setTimeout(() => this._selectByScroll(i));
//                 return;
//             }
//         }
//         throw new Error(`can not select value: ${value}, ${value} match nothing in current source`);
//     }
//
//     get value() {
//         return this.options.value;
//     }
//
//     destroy() {
//         this._stop();
//         if (this.elems.el) {
//             for (const eventName in this.events) {
//                 this.elems.el.removeEventListener(eventName, this.events[eventName as keyof typeof this.events]!);
//             }
//             this.elems.el.innerHTML = '';
//         }
//         document.removeEventListener('mousedown', this.events['touchstart']!);
//         document.removeEventListener('mousemove', this.events['touchmove']!);
//         document.removeEventListener('mouseup', this.events['touchend']!);
//     }
// }
//
// // Date utility functions
// function getYears(): SourceItem[] {
//     const currentYear = new Date().getFullYear();
//     const years: SourceItem[] = [];
//     for (let i = currentYear - 40; i < currentYear + 1; i++) {
//         years.push({
//             value: i,
//             text: i + '年',
//         });
//     }
//     return years;
// }
//
// function getMonths(): SourceItem[] {
//     const months: SourceItem[] = [];
//     for (let i = 1; i <= 12; i++) {
//         months.push({
//             value: i,
//             text: i + '月',
//         });
//     }
//     return months;
// }
//
// function getDays(year: number, month: number): SourceItem[] {
//     const dayCount = new Date(year, month, 0).getDate();
//     const days: SourceItem[] = [];
//     for (let i = 1; i <= dayCount; i++) {
//         days.push({
//             value: i,
//             text: i + '日',
//         });
//     }
//     return days;
// }
//
// const IosBirthdayPicker: React.FC = () => {
//     const [inputValue, setInputValue] = useState<string>('');
//     const [isVisible, setIsVisible] = useState<boolean>(false);
//     const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
//     const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
//     const [currentDay, setCurrentDay] = useState<number>(new Date().getDate());
//
//     const yearSelectorRef = useRef<IosSelector | null>(null);
//     const monthSelectorRef = useRef<IosSelector | null>(null);
//     const daySelectorRef = useRef<IosSelector | null>(null);
//
//     const yearSource = getYears();
//     const monthSource = getMonths();
//     const [daySource, setDaySource] = useState<SourceItem[]>(getDays(currentYear, currentMonth));
//
//     const updateDaySource = useCallback((year: number, month: number) => {
//         const newDaySource = getDays(year, month);
//         setDaySource(newDaySource);
//         if (daySelectorRef.current) {
//             daySelectorRef.current.updateSource(newDaySource);
//         }
//     }, []);
//
//     useEffect(() => {
//         if (isVisible) {
//             // Initialize selectors when picker becomes visible
//             setTimeout(() => {
//                 yearSelectorRef.current = new IosSelector({
//                     el: '#year1',
//                     type: 'infinite',
//                     source: yearSource,
//                     count: 20,
//                     onChange: (selected) => {
//                         setCurrentYear(selected.value);
//                         updateDaySource(selected.value, currentMonth);
//                     },
//                 });
//
//                 monthSelectorRef.current = new IosSelector({
//                     el: '#month1',
//                     type: 'infinite',
//                     source: monthSource,
//                     count: 20,
//                     onChange: (selected) => {
//                         setCurrentMonth(selected.value);
//                         updateDaySource(currentYear, selected.value);
//                     },
//                 });
//
//                 daySelectorRef.current = new IosSelector({
//                     el: '#day1',
//                     type: 'infinite',
//                     source: daySource,
//                     count: 20,
//                     onChange: (selected) => {
//                         setCurrentDay(selected.value);
//                     },
//                 });
//
//                 // Set initial values
//                 setTimeout(() => {
//                     const now = new Date();
//                     yearSelectorRef.current?.select(now.getFullYear());
//                     monthSelectorRef.current?.select(now.getMonth() + 1);
//                     daySelectorRef.current?.select(now.getDate());
//                 }, 100);
//             }, 100);
//         }
//
//         return () => {
//             // Cleanup
//             if (yearSelectorRef.current) {
//                 yearSelectorRef.current.destroy();
//                 yearSelectorRef.current = null;
//             }
//             if (monthSelectorRef.current) {
//                 monthSelectorRef.current.destroy();
//                 monthSelectorRef.current = null;
//             }
//             if (daySelectorRef.current) {
//                 daySelectorRef.current.destroy();
//                 daySelectorRef.current = null;
//             }
//         };
//     }, [isVisible, daySource, yearSource, monthSource, currentMonth, currentYear, updateDaySource]);
//
//     const handleInputClick = () => {
//         setIsVisible(true);
//     };
//
//     const handleConfirm = () => {
//         setIsVisible(false);
//         const selectedDate = `${yearSelectorRef.current?.value || currentYear}-${monthSelectorRef.current?.value || currentMonth}-${daySelectorRef.current?.value || currentDay}`;
//         setInputValue(selectedDate);
//     };
//
//     const handleClear = () => {
//         setInputValue('');
//     };
//
//     return (
//         <div className="min-h-screen bg-gray-500 flex flex-col items-center justify-center p-4">
//             <style jsx>{`
//                 .select-wrap {
//                     position: relative;
//                     height: 100%;
//                     text-align: center;
//                     overflow: hidden;
//                     font-size: 20px;
//                     color: #ddd;
//                 }
//
//                 .select-wrap:before,
//                 .select-wrap:after {
//                     position: absolute;
//                     z-index: 1;
//                     display: block;
//                     content: '';
//                     width: 100%;
//                     height: 50%;
//                 }
//
//                 .select-wrap:before {
//                     top: 0;
//                     background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
//                 }
//
//                 .select-wrap:after {
//                     bottom: 0;
//                     background-image: linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
//                 }
//
//                 .select-options {
//                     position: absolute;
//                     top: 50%;
//                     left: 0;
//                     width: 100%;
//                     height: 0;
//                     transform-style: preserve-3d;
//                     margin: 0 auto;
//                     display: block;
//                     transform: translateZ(-150px) rotateX(0deg);
//                     -webkit-font-smoothing: subpixel-antialiased;
//                     color: #666;
//                     list-style: none;
//                     padding: 0;
//                 }
//
//                 .select-option {
//                     position: absolute;
//                     top: 0;
//                     left: 0;
//                     width: 100%;
//                     height: 50px;
//                     -webkit-font-smoothing: subpixel-antialiased;
//                     list-style: none;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                 }
//
//                 .highlight {
//                     position: absolute;
//                     top: 50%;
//                     transform: translate(0, -50%);
//                     width: 100%;
//                     background-color: #fff;
//                     border-top: 1px solid #333;
//                     border-bottom: 1px solid #333;
//                     color: #ff0000;
//                     font-size: 24px;
//                     overflow: hidden;
//                 }
//
//                 .highlight-list {
//                     position: absolute;
//                     width: 100%;
//                     list-style: none;
//                     padding: 0;
//                     margin: 0;
//                 }
//
//                 .highlight-item {
//                     list-style: none;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                 }
//             `}</style>
//
//             <div className="text-center mb-4">
//                 <input
//                     type="text"
//                     placeholder="Type something..."
//                     value={inputValue}
//                     onClick={handleInputClick}
//                     readOnly
//                     className="px-4 py-2 border border-gray-300 rounded-md text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>
//
//             <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
//                 isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
//             }`}>
//                 <div className="bg-white rounded-lg shadow-xl">
//                     <div className="relative mx-auto mt-4 w-80 h-80 bg-white rounded-lg">
//                         <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-stretch justify-between w-72 h-80" style={{ perspective: '2000px' }}>
//                             <div className="flex-1">
//                                 <div id="year1" className="h-full"></div>
//                             </div>
//                             <div className="flex-1">
//                                 <div id="month1" className="h-full"></div>
//                             </div>
//                             <div className="flex-1">
//                                 <div id="day1" className="h-full"></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="text-center mt-4 pb-4">
//                         <button
//                             type="button"
//                             onClick={handleClear}
//                             className="mr-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                         >
//                             清除
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleConfirm}
//                             className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                         >
//                             確定
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// // export default IosBirthdayPicker;
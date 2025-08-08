import {useEffect} from 'react';

export function useDragScroll(ref: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let isDown = false;
        let startY: number;
        let scrollTop: number;

        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            el.classList.add('dragging');
            startY = e.pageY;
            scrollTop = el.scrollTop;
        };

        const handleMouseLeave = () => {
            isDown = false;
            el.classList.remove('dragging');
        };

        const handleMouseUp = () => {
            isDown = false;
            el.classList.remove('dragging');
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const y = e.pageY;
            const walk = y - startY;
            el.scrollTop = scrollTop - walk;
        };

        el.addEventListener('mousedown', handleMouseDown);
        el.addEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseup', handleMouseUp);
        el.addEventListener('mousemove', handleMouseMove);

        return () => {
            el.removeEventListener('mousedown', handleMouseDown);
            el.removeEventListener('mouseleave', handleMouseLeave);
            el.removeEventListener('mouseup', handleMouseUp);
            el.removeEventListener('mousemove', handleMouseMove);
        };
    }, [ref]);
}

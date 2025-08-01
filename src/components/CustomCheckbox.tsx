import React, {ChangeEvent} from 'react';

interface CustomCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    fail?: boolean;
    successful?: boolean;
    id: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
                                                           checked,
                                                           onChange,
                                                           label = 'Custom Checkbox',
                                                           fail,
                                                           successful,
                                                           id
                                                       }) => {
    // Генерируем уникальный id один раз при создании компонента
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    const labelRef = React.useRef<HTMLLabelElement>(null);

    return (
        <div className="flex items-center gap-[6px] cursor-pointer"
             onClick={(e) => {
                 if (labelRef.current?.contains(e.target as Node)) return;
                 onChange(!checked)
             }
             }>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={handleChange}
                className="hidden peer"
            />
            <label
                ref={labelRef}
                htmlFor={id}
                className={`
                    before:content-['']
                    before:absolute before:top-[-2.4px] before:left-[-2.4px] before:right-[-2.4px] before:bottom-[-2.4px]  before:z-[-1]
                    relative z-[0]
                    peer-checked:before:shadow-[0px_0px_2.4px_0px_#000000CC]
                    group active:scale-[0.9] transition-all duration-300 active:!border-[#5F5F5F]
                    w-[20px] h-[20px] flex items-center justify-center border-[1.2px] border-[#353535] rounded-[1.8px]
                  ${successful && 'peer-checked:border-[#34C759]'}
                  peer-checked:*:block
                  cursor-pointer ${fail && '!border-[#FF3030]'}`}

            >
                {/*<span className="hidden group-active:block">*/}
                <span className={`${successful ? 'block' : 'hidden'}`}>
                    <svg
                        className={`group-active:*:fill-[#FFF] ${!successful && '*:fill-[#FFF]'} transition-all duration-300`}
                        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.30294 11.2728L5.75736 8.72718L4.0603 10.4242L8.30294 14.6669L15.9397 7.03013L14.2426 5.33307L8.30294 11.2728Z"
                            fill="#34C759"/>
                    </svg>
                </span>
            </label>
            <span
                className={`text-[#adadad] transition-all duration-300 peer-checked:text-[#FFF] ${fail && '!text-[#FF3030]'}`}>{label}</span>
        </div>
    );
};

export default CustomCheckbox;

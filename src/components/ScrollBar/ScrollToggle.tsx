'use client';

import {useState} from 'react';

export default function ScrollToggle({
                                         onToggle
                                     }: {
    onToggle: (useNativeScroll: boolean) => void
}) {
    const [enabled, setEnabled] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setEnabled(checked);
        onToggle(checked);
    };

    return (
        <label style={{position: 'fixed', top: 70, right: 10, zIndex: 9999}}>
            <input type="checkbox" checked={enabled} onChange={handleChange}/>
            Использовать нативный скролл
        </label>
    );
}

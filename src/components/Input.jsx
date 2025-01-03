import { forwardRef } from "react";

const Input= forwardRef(function Input({label, isTexarea, ...props}, ref){

    const classes="w-full p-1 border-b-2 rounded-sm bordere-stone-300 bg-stone-200 text-stone-600 focus:ouline-none focus: border-stone-600";
    return (
        <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            {isTexarea ? (
                <textarea ref={ref} className={classes} {...props}/>
            ) : (
                <input ref={ref} className={classes} {...props}/>
            )}
        </p>
    );
}
);

export default Input;
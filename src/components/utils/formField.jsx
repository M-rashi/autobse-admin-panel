import React from "react";
import { inputStyle, labelAndInputDiv, labelStyle, textAreaStyle } from "./style";
import { Controller } from "react-hook-form";


import Select from "react-select";


const CheckboxInput = ({ label, name, register, error }) => {
  return (
    <div className="flex items-center mt-2">
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        className="mr-2 h-5 w-5 rounded border-gray-300 shadow-sm focus:ring-black"
      />
      <label htmlFor={name} className="text-black">
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CheckboxInput;

//  type is input
export const FormFieldInput = ({ label, type, name, register,defaultValue, error, ...rest }) => {
  return (
    <div className="flex flex-col">
     
      <label  className={`${labelStyle.data}`} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        {...register(name, rest)}
        className={`${inputStyle.data}`}
      />
      
      {error && <p className="text-red-500">{`${label} Required`}</p>}
    </div>
  );
};


// input type is textarea
export const TextAreaInput = ({ label, type, name, register,defaultValue, error, ...rest }) => {
  return (
    <div className="flex flex-col">
      <label className="t" htmlFor={name}>
        {label}
      </label>
      <textarea
        type={type}
        defaultValue={defaultValue}
        {...register(name, rest)}
        className={`${inputStyle.data}`}
      />
      
      {error && <p className="text-red-500">{`${label} Required`}</p>}
    </div>
  );
};

// Input type is select with constant value maping

export const SelectInput = ({ label, name, options,defaultValue,error, register, ...rest }) => {
  
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name,{required:true})}
        className={`${inputStyle.data}`}
        {...rest}
        defaultValue={defaultValue}
      >
        <option value={defaultValue}>{defaultValue}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{`${label} Required`}</p>}
    
    </div>
  );
};


export const CatInput = ({ label, name, options,defaultValue,error, register, ...rest }) => {
  
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name,{required:true})}
        className={`${inputStyle.data}`}
        {...rest}
        defaultValue={defaultValue}
      >
        <option value={defaultValue}>{defaultValue}</option>
        {options.map((option) => (
          <option key={option.name} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{`${label} Required`}</p>}
    
    </div>
  );
};
export const StateInput = ({ label, name, options,defaultValue,error, register, ...rest }) => {
  
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name,)}
        className={`${inputStyle.data}`}
        {...rest}
        defaultValue={defaultValue}
      >
        <option value={defaultValue}>{defaultValue}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{`${label} Required`}</p>}
    
    </div>
  );
};
// Input type is select with dynamic value maping
export const SelectWithDynamic  = ({   options,defaultValue,error, register,mappingValue,mappingLabel,defaultLabel, ...rest }) => {
    
  return (
    
    <div className="flex flex-col">
      <label htmlFor={rest.name}>{rest.label}</label>
      <select
        {...register(rest.name,{required: true})}
        className={`${inputStyle.data}`}
          {...rest}
        
      >
        <option value={defaultValue}>{defaultLabel}</option>
         {options?.map((option) => (
          <>
          
          <option key={option[mappingValue]} value={option[mappingValue]}> 
            {option[mappingLabel]} 
          </option>
          </>
        ))
        }  
      </select>
      {error && <p className="text-red-500">{`${rest.label} Required`}</p>}
    </div>
  );
};
export const InputFields = ({
  label,
  register,
  error,
  defaultValue,
  component = "input",
  options = [],
  type = "text",
  control,
  isMulti = false,
  name,
  disabled = false,
}) => (
  <div className={`${labelAndInputDiv.data}`}>
    {label && <label className="font-bold">{label}</label>}
    {component === "input" && (
      <input
        type={type}
        defaultValue={defaultValue}
        {...register}
        className={`${inputStyle.data}`}
        disabled={disabled}
      />
    )}
    {component === "textarea" && (
      <textarea
        defaultValue={defaultValue}
        {...register}
        className={`${inputStyle.data} h-40`}
      />
    )}
    {component === "select" && (
      <select
        defaultValue={defaultValue}
        {...register}
        className={`${inputStyle.data}`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )}
    {component === "controller" && control && (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            className={`${inputStyle.data}`}
            options={options}
            {...field}
            isMulti={isMulti}
          />
        )}
      />
    )}
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);
// imaged maping
export const InputField = ({ label, type = "text", register, error, defaultValue, component, options ,disabled=false}) => (
  <div className={labelAndInputDiv.data}>
    <label>{label}</label>
    {component === "select" ? (
      <select {...register} defaultValue={defaultValue} className={inputStyle.data}>
        {options?.map((option, index) => <option key={index} value={option}>{option}</option>)}
      </select>
    ) : (
      <input type={type} {...register} defaultValue={defaultValue} className={inputStyle.data} disabled={disabled} />
    )}
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);

export  const ImageMaping= ({images}) => {
  return (
    <div className="grid grid-cols-2 gap-x-10  gap-y-5 m-2 col-span-3">
    {images?.map((imgs, index) => {
       return (
         <div className=" bg-gray-50 rounded-2xl">
    
           <div className="text-center">  <p>Image {index+1}</p></div>
         
<div className=" flex justify-center">
<img src={imgs} alt={imgs} key={index} className="h-80  text-center" />
</div>
          
         </div>
       );
     })}
        
        </div>
  )
}
// ---------------------------


export const UploadDocument = ({label,fun,url}) => {
  return (
    <div>
    <label>{label}</label>
    <input
      type="file"
      className={`${inputStyle.data}`}
      onChange={fun} 
      accept="/image/*"
      multiple
    />

    <>
 
 


  
       <img src={url} alt='img'/> 
    </>
  </div>
  )
}

 



// ---------------------------


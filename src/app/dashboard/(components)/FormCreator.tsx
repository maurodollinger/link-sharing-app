/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Button from "@/app/ui/customButton";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";

import { IconOptions } from "@/app/lib/utils";
import IconDrag from '../../../../public/assets/images/icon-drag-and-drop.svg';
import GithubIcon from '../../../../public/assets/images/icon-github.svg';

import { updateUserLinkById } from "@/app/lib/api";
import { Link } from "@/app/lib/definitions";
import { LinkValidation } from "@/app/lib/validations";
import { useLinksContext } from "../(context)/LinksContext";



interface NewLinkInputsProps {
  data: {
    id: string;
    index:number;
    platform: string;
    url: string;
  }
}

type Option = {
  value: string;
  label: string
  icon: string;
}

interface CustomDropdownProps {
  field: {
    name: string;
    value: string
    onChange: (value: string) => void;
  };
  form: any;
  onClick: (platform:string) => void;
}

const CustomDropdown = ({ field, form, onClick }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(field.value || null);
  const labelRef = useRef<HTMLLabelElement | null>(null);
 
  const toggleDropdown = () => {
    if (labelRef.current) {
      labelRef.current.classList.toggle('focus');
    }
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue:Option) => {
    form.setFieldValue(field.name, optionValue.value);
    setCurrentOption(optionValue.value);
    onClick(optionValue.value);
    toggleDropdown();
  };


  const Icon = IconOptions.find((option) => option.value === currentOption)?.icon;
  const label = IconOptions.find((option) => option.value === currentOption)?.label || "Github";

  return (
    <div className="relative">  
      <div className="flex w-full relative items-center">
        
        <span className="absolute left-4 top-auto bottom-auto">
          {Icon ? <Icon /> : <GithubIcon/> }
        </span>
        <label ref={labelRef} className="custom-input custom-select w-full" onClick={toggleDropdown} >{label} </label>
        </div>
        {isOpen && (
        <ul className="absolute custom-dropdown">
          {IconOptions.map(option =>
          {
            const Icon = option.icon;
           return (
           <li key={option.value} onClick={() => handleOptionClick(option)}>
              <Icon/>
              {option.label}
            </li>
          )})}
        </ul>
      )}
    </div>
  )
}

const LinkInput = ({ index, url }: { index: number, url: string }) => {
  return (
    <>
    <Field name={`links[${index}].url`} value={url}>
      {({ field, form }: any) => (
        <input {...field} value={field.value}
          placeholder="e.g. https://www.github.com/johnappleseed"
          className={`custom-input ${form.errors.links && form.errors.links[index]?.url && 'invalid'}`}
          style={{backgroundImage: "url('/assets/images/icon-link.svg')"}}
        />
      )}
    </Field>
    <ErrorMessage component="span"  name={`links[${index}].url`}  className="text-red text-xs"/>
    </>
  )
};

const NewLinkInputs = ({ data }: NewLinkInputsProps) => {
  const { removeUserLink, updateUserLinkPlatform } = useLinksContext();
  
  const handleOnClick = (platform:string) => {
    updateUserLinkPlatform(data.id, platform);
  }

  return (

    <div id={`link-class-${data.index}`} className='bg-light-grey rounded-xl p-5'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <a><IconDrag/></a>
          <h3 className='heading-s text-grey'>Link #{data.index+1}</h3>
        </div>
        <button className='text-grey font-light' onClick={() => removeUserLink(data.id)}>Remove</button>
      </div>
      <div className="flex flex-col gap-1 text-dark-grey mt-3">
        <label className='body-s '>Platform</label>
        <Field name={`links[${data.index}].platform`} type="text">
          {({ field, form } : any) => (
            <CustomDropdown field={field} form={form} onClick={(p)=>handleOnClick(p)}/>
          )
          }
        </Field>
      </div>
      <div className="flex flex-col gap-1 text-dark-grey mt-3">
        <label className='body-s  text-dark-grey'>Link</label>

        <LinkInput index={data.index} url={data.url}/>
      </div> 

    </div>
  )
}


const ButtonContainer = ({ isSubmiting }: { isSubmiting: boolean }) => {
  const { isValid } = useFormikContext();

  return (
    <div className='absolute pb-10 pr-10 pl-10 left-0 right-0 bottom-0'>
      <div className='relative mt-10 flex justify-end'>
        <div className='absolute left-[-2.5rem] right-[-2.5rem] top-0 border-t border-borders'></div>

        <Button
          className='mt-6 w-full pl-7 pr-7 sm:w-auto'
          buttonType='primary'
          disabled={isSubmiting || !isValid}
          type="submit"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default function FormCreator({ userlinks }: { userlinks: Link[] | [] }) {
  const { user_id } = useLinksContext();
  const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null);

  const initialValues = userlinks.map(link => ({id: link.id, platform: link.platform, url: link.url }));
  //console.log("links", userlinks);

  useEffect(() => {
    if (lastAddedIndex !== null) {
      const timeout = setTimeout(() => {
        const newLinkInput = document.getElementById(`link-class-${lastAddedIndex}`);
        if (newLinkInput) {
          newLinkInput.classList.add('flash');
          setTimeout(() => {
            newLinkInput.classList.add('fade-out');
          }, 1000);
          const body = document.getElementsByTagName('body').item(0);
          if(body) body.scroll(0, newLinkInput.offsetTop);
        }
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [lastAddedIndex]);
  
    return (
        <>
        <Formik
          enableReinitialize={true}
          initialValues={{ links: initialValues }}
          validationSchema={LinkValidation}
          onReset={(values) => setLastAddedIndex(values.links.length)}
          onSubmit={(values) => {   
            
            updateUserLinkById(user_id, values).then((result) => {
            //  console.log(result);
            })
          }}
        >
          {({ values, isSubmitting }) => (
          <Form>
            <div className='flex flex-col gap-6 mt-6 mb-28'>
                {values.links.map((link, index) => (
                  <NewLinkInputs key={link.id} data={{ id: link.id, index:index, platform: link.platform, url: link.url} } />
                ))}
            </div>
            <ButtonContainer isSubmiting={isSubmitting} />
          </Form>
          )}
        </Formik>
        </>
    )
};
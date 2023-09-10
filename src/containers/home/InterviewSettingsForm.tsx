import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

import { useData } from "./DataProvider";


interface SelectedOption {
  label: string;
  value: string;
}


const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const { state, setState } = useData();
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required(
        "Interview Duration is required"
      ),
      interviewLanguage: Yup.string().required(
        "Interview Language is required"
      ),
    }),
    onSubmit: (values) => {
      console.log({ values });
      alert("Form successfully submitted");
    },
  });

  const handleSelectChange = (fieldName: string, selectedValue: string) => {
    
    console.log("Field Name:", fieldName);
    console.log("Selected Value:", selectedValue);
    selectedValue = selectedValue.toString();
    setFieldValue(fieldName, selectedValue);
    setState((prevState) => ({
      ...prevState,
      interviewSettings: {
        ...prevState.interviewSettings,
        [fieldName]: selectedValue
      },
    }));
  };


  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(selectedValue: SelectedOption) => {
            handleSelectChange("interviewMode", selectedValue.label); 
          }}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
          
        />
    
      
      <FormSelect
        label="Interview Duration"
        placeholder="Select interview duration"
        name="interviewDuration"
        options={interviewDurationOptions}
        onChange={(selectedValue: SelectedOption) => {
          handleSelectChange("interviewDuration", selectedValue.label); 
        }}
        onBlur={setFieldTouched}
        value={values?.interviewDuration}
        error={errors?.interviewDuration}
        touched={touched?.interviewDuration}
      />
      
      <FormSelect
        label="Interview Language"
        name="interviewLanguage"
        placeholder="Select interview language"
        options={interviewLanguageOptions}
        onChange={(selectedValue: SelectedOption) => {
          handleSelectChange("interviewLanguage", selectedValue.label); 
        }}
        onBlur={setFieldTouched}
        error={errors.interviewLanguage}
        touched={touched.interviewLanguage}
        value={values.interviewLanguage}
      />
      
      <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
        <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
          Previous
        </Button>
        <Button colorScheme="red" type="submit">
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default InterviewDetailsForm;

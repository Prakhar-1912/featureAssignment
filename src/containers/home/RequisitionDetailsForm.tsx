import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useData } from "./DataProvider";
import { Options } from "react-select";

interface SelectedOption {
  label: string;
  value: string;
}


const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {

  const { state, setState } = useData();

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string()
        .min(3)
        .max(20)
        .required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      console.log({ values });

      handleTab(1);
      
      setState((prevState) => ({
        ...prevState,
        requisitionDetails: values,
      }));
      
      console.log({ state });
    },
  });

  // const handleFieldChange = (fieldName: string, fieldValue: any) => {
  //   setFieldValue(fieldName, fieldValue);
  //   setState((prevState) => ({
  //     ...prevState,
  //     requisitionDetails: {
  //       ...prevState.requisitionDetails,
  //       [fieldName]: fieldValue,
  //     },
  //   }));
  // };

  const handleInputChange = (fieldName: string, fieldValue: string) => {
    setFieldValue(fieldName, fieldValue);
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [fieldName]: fieldValue,
      },
    }));
  };

  // Handle changes for FormSelect components
  const handleSelectChange = (fieldName: string, selectedValue: string) => {
    
    console.log("Field Name:", fieldName);
    console.log("Selected Value:", selectedValue);
    selectedValue = selectedValue.toString();
    setFieldValue(fieldName, selectedValue);
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [fieldName]: selectedValue
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e) =>
            handleInputChange("requisitionTitle", e.target.value)
          }
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e) => handleInputChange("noOfOpenings", e.target.value)}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(selectedValue: SelectedOption) => {
            console.log("hello", selectedValue);
            // console.log("Selected Value:", selectedValue);
            handleSelectChange("gender", selectedValue.label); 
            // handleSelectChange("gender", "chakka"); 
          }}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(selectedValue: SelectedOption) => {
            handleSelectChange("urgency", selectedValue.label);
            // handleSelectChange("urgency", "jldinhi"); 
          }}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;

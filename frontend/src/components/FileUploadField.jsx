import { Field, ErrorMessage } from "formik";

const FileUploadField = ({ field, form }) => {
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
  };

  return (
    <div>
      <label htmlFor={field.name}>User Image</label>
      <input
        type="file"
        id={field.name}
        name={field.name}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploadField;

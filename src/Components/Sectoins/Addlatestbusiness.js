import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import toastr from "toastr";

function AddLatest({setshowForm}) {
  const [Work, setWork] = useState("");
  const [CityName, setCityName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadUrl = "https://api.binary.yachts/api/upload";
    const apiUrl = "https://api.binary.yachts/api/editSection";
    const token = sessionStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const uploadResponse = await axios.post(uploadUrl, formData);
        const imageUrl = uploadResponse.data.url;
        setUploadedImageUrl(imageUrl);

        const data = {
          sectionId: 6,
          data: {
            image: imageUrl,
            CityName: CityName,
            Work: Work,
          },
        };

        try {
          const response = await axios.post(apiUrl, data, { headers });

          setCityName("");
          setWork("");
          setSelectedFile(null);
          toastr.success("تم اضافة عنصر جديد");
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setshowForm(false)
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className=" border p-4 rounded-4 shadow-lg border-1 ">
        <Form.Group controlId="name">
          <Form.Label>اسم المدينة</Form.Label>
          <Form.Control
            type="text"
            value={CityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="msg">
          <Form.Label>العمل </Form.Label>
          <Form.Control
            type="text"
            value={Work}
            onChange={(e) => setWork(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="file">
          <Form.Label>اختار الصورة </Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button className="mt-3 w-25" variant="primary" type="submit">
          حفظ
        </Button>
       
      </div>
    </Form>
  );
}

export default AddLatest;
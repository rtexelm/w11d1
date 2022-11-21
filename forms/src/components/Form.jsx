import { useState } from "react";

const isEmail = (email) => {
  return email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
};

const isPhone = (phone) => {
  return phone.match(/^([1-9]\d{2})([- .])(\d{3})$2(\d{4})$/);
};

const validate = (formData) => {
  let errors = {};
  if (!formData.name) {
    errors["name"] = "Name must be present";
  }

  if (!formData.email || !isEmail(formData.email)) {
    errors["email"] = "Email must be present";
  }

  if (!isPhone(formData.phone)) {
    errors["phone"] = "Must be valid phone number";
  }

  if (formData.phone && !formData.phoneType) {
    errors["phoneType"] = "Must select phone type";
  }

  if (formData.bio && formData.bio.length > 280) {
    errors["bio"] = "Must be less than 280 characters";
  }

  return errors;
};

export function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    phoneType: "",
    staff: "",
    bio: "",
    notifications: false,
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const errors = validate(formData);
    console.log(errors);
  };

  return (
    <div>
      <h1>My Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Eamil</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneType">Phone Type</label>
          <select
            name="phoneType"
            id="phoneType"
            value={formData.phoneType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Phone Type
            </option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        <div>
          <label htmlFor="staff">Staff</label>
          <input
            type="radio"
            name="staff"
            id="staff"
            value="instructor"
            onChange={handleChange}
          />
          Instructor
          <input
            type="radio"
            name="staff"
            id="staff"
            value="student"
            onChange={handleChange}
          />
          Student
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            id="bio"
            cols="30"
            rows="10"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="notifications">Notifications</label>
          <input
            type="checkbox"
            name="notifications"
            id="notifications"
            checked={formData.notifications}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

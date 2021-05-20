import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useState } from "react";

const PortfolioForm = ({ onSubmit, initValues = "" }) => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: initValues,
  });

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          {...register("title", { required: true, maxLength: 128 })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Company</label>
        <input
          {...register("company", { required: true, maxLength: 64 })}
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Company Website</label>
        <input
          {...register("companyWebsite", { required: true, maxLength: 128 })}
          name="companyWebsite"
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Location</label>
        <input
          {...register("location", { required: true })}
          name="location"
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Job Title</label>
        <input
          {...register("jobTitle", { required: true })}
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          {...register("description", { required: true })}
          name="description"
          rows="5"
          type="text"
          className="form-control"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <div>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <DatePicker
                {...field}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                onChange={(e) => field.onChange(e)}
                selected={field.value}
                // selected={endDate}
                // onChange={(date) => setEndDate(date)}
              />
            )}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <div>
          <Controller
            name="endDate"
            control={control}
            defaultValue=""
            // defaultValue={new Date()}
            render={({ field }) => (
              <DatePicker
                {...field}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                onChange={(e) => field.onChange(e)}
                selected={field.value}
                // selected={endDate}
                // onChange={(date) => setEndDate(date)}
              />
            )}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Create
      </button>
    </form>
  );
};

export default PortfolioForm;

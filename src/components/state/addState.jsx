import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateStateMutation, useStatesQuery } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";

const AddState = () => {
  const [createState] = useCreateStateMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetch } = useStatesQuery(); // get the data from the server

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataOnSubmit) => {
    setLoading(true);
    try {
      await createState({
        variables: { createStateInput: { name: dataOnSubmit?.name } },
      });
      ShowPopup(
        "Success!",
        `${dataOnSubmit?.name} added successfully!`,
        "success",
        5000,
        true
      );
      refetch();
      reset();
      setIsModalOpen(false);
    } catch (error) {
      ShowPopup("Failed!", `${error?.message}`, "error", 5000, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center mr-20">
      {/* Add Location Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-2 w-fit bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Add Location
      </button>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-red-500 font-bold float-right"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  State Name
                </label>
                <input
                  {...register("name", { required: true })}
                  className="input input-bordered input-secondary w-full p-2 border border-gray-300 rounded"
                  type="text"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Location"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddState;

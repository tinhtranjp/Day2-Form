import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { schema } from "./validation.tsx";

enum GenderEnum {
  male = "male",
  female = "female",
}
type Inputs = {
  name: string;
  katakana: string;
  email: string;
  phone: string;
  gender: GenderEnum;
  pass: string;
  checkPass: string;
};
function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" /*resolver: zodResolver(schema) */ });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const passValue = watch("pass");
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  return (
    <>
      <div className="w-[1200px] mx-auto mt-24">
        <h1 className="text-3xl text-center my-12">新規会員登録</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="ml-[300px] pt-12 w-full"
        >
          <div className="flex mt-4">
            <label htmlFor="name" className="w-[150px]">
              お名前 （必須）
            </label>
            <div className="ml-4">
              <input
                id="name"
                type="text"
                {...register("name")}
                {...register("name", {
                  required: "ten bat buoc",
                  minLength: { value: 4, message: "nhap tren 4 ky tu ban oi" },
                })}
                className="border border-slate-600 outline-0 px-2 py-1 min-w-[400px] rounded"
              />
              <p
                className={`text-sm mt-2 ${errors.name ? "text-red-500" : ""}`}
              >
                {errors.name?.message || `例) 山田 太郎`}
              </p>
            </div>
          </div>
          <div className="flex mt-4">
            <label htmlFor="katakana" className="w-[150px]">
              お名前(フリガナ)
            </label>
            <div className="ml-4">
              <input
                id="katakana"
                {...register("katakana", {
                  required: "ten bat buoc",
                  minLength: { value: 4, message: "nhap tren 4 ky tu ban oi" },
                })}
                type="text"
                className="border border-slate-600 outline-0 px-2 py-1 min-w-[400px] rounded"
              />
              <p
                className={`text-sm mt-2 ${
                  errors.katakana ? "text-red-500" : ""
                }`}
              >
                {errors.katakana?.message || `例) ヤマダ タロウ`}
              </p>
            </div>
          </div>
          <div className="flex mt-4">
            <label htmlFor="email" className="w-[150px]">
              メールアドレス （必須）
            </label>
            <div className="ml-4">
              <input
                id="email"
                {...register("email", {
                  required: "email bat buoc",
                  pattern: {
                    value: emailRegex,
                    message: "Định dạng email không hợp lệ",
                  },
                })}
                type="text"
                className="border border-slate-600 outline-0 px-2 py-1 min-w-[400px] rounded"
              />
              <p
                className={`text-sm mt-2 ${errors.email ? "text-red-500" : ""}`}
              >
                {errors.email?.message || `例) Abc@gmail.com`}
              </p>
            </div>
          </div>
          <div className="flex mt-4">
            <label htmlFor="phone" className="w-[150px]">
              電話番号 （必須）
            </label>
            <div className="ml-4">
              <input
                id="phone"
                {...register("phone", {
                  required: "sdt bat buoc",
                  minLength: {
                    value: 10,
                    message: "nhap 10 ky tu tro len ban oi",
                  },
                })}
                type="text"
                className="border border-slate-600 outline-0 px-2 py-1 min-w-[400px] rounded"
              />
              <p
                className={`text-sm mt-2 ${errors.phone ? "text-red-500" : ""}`}
              >
                {errors.phone?.message || `例) 03-1234-5678`}
              </p>
            </div>
          </div>
          <div className="flex mt-4">
            <label htmlFor="gender" className="w-[150px]">
              性別 （必須）
            </label>
            <div className="ml-4">
              <select
                id="gender"
                {...register("gender", { required: "Yeu cau chon gioi tinh" })}
              >
                <option value="">-----</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
              </select>
              <p className="text-red-500">{errors.gender?.message}</p>
            </div>
          </div>
          <div className="flex mt-4">
            <label htmlFor="pass" className="w-[150px]">
              パスワード（必須）
            </label>
            <div className="ml-4">
              <input
                id="pass"
                {...register("pass", {
                  required: "pass bat buoc",
                  minLength: { value: 8, message: "nhap tren 8 ky tu ban oi" },
                })}
                type="password"
                className="border border-slate-600 outline-0 px-2 py-1 min-w-[400px] rounded"
              />
              <p
                className={`text-sm mt-2 ${errors.pass ? "text-red-500" : ""}`}
              >
                {errors.pass?.message || `8文字以上入力してください`}
              </p>
            </div>
          </div>
          <div className="flex mt-4">
            <label htmlFor="check-pass" className="w-[150px] text-left">
              再入力 パスワード（必須）
            </label>
            <div className="ml-4">
              <input
                id="checkPass"
                {...register("checkPass", {
                  required: "Vui lòng nhập lại mật khẩu",
                  validate: (value) =>
                    value === passValue || "Mật khẩu không khớp",
                })}
                type="password"
                className="border border-slate-600 outline-0 px-2 py-1 min-w-[400px] rounded"
              />
              <p
                className={`text-sm mt-2 ${
                  errors.checkPass?.message ? "text-red-500" : ""
                }`}
              >
                {errors.checkPass?.message || `上のように入力してください`}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center w-[550px]">
            <input
              type="submit"
              className="px-8 py-3 rounded bg-sky-600 cursor-pointer mt-12"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default App;

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./App.css";

const fieldScheme = yup.object().shape({
	email: yup.string().email().required("Не корректный email"),
	password: yup
		.string()
		.min(6, "Минимальное количество символов 6")
		.max(20, "Максимальное количесвто симовлов 20")
		.required(),
	repeatePassword: yup
		.string()
		.oneOf([yup.ref("password"), null])
		.required("пароли не совпадают"),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(fieldScheme),
	});

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<div className="App">
			<h2>Страница регистрации нового пользователя</h2>
			<form className="box" onSubmit={handleSubmit(onSubmit)}>
				<input type="email" placeholder="Email..." {...register("email")} />
				<p style={{ color: "red" }}>{errors.email?.message}</p>

				<input
					type="password"
					placeholder="Введите пароль"
					{...register("password")}
				/>
				<p style={{ color: "red" }}>{errors.password?.message}</p>
				<input
					type="password"
					placeholder="Введите пароль повторно"
					{...register("repeatePassword")}
				/>
				<p style={{ color: "red" }}>{errors.repeatePassword?.message}</p>
				<button className="custom btn" type="submit">
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

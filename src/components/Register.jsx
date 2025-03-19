import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    nombre: yup.string().required("El nombre es requerido"),
    apellidos: yup.string().required("Los apellidos son requeridos"),
    email: yup.string().required("El email es requerido").email("Email no válido"),
    edad: yup.number()
      .integer("El dato debe ser un número entero")
      .required("La edad es requerida")
      .min(18, "Debes tener mínimo 18 años")
      .typeError("La edad debe ser un número"),
    telefono: yup.string()
      .required("El teléfono es requerido")
      .matches(/^\d{10,}$/, "El teléfono debe tener al menos 10 dígitos"),
    password: yup.string()
      .required("La contraseña es requerida")
      .min(4, "Mínimo 4 caracteres")
      .max(10, "Máximo 10 caracteres"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("La confirmación de contraseña es requerida")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log("Datos de registro:", data);
    
    
    const userData = {
      nombre: data.nombre,
      apellidos: data.apellidos,
      email: data.email,
      edad: data.edad,
      telefono: data.telefono,
      password: data.password
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre completo"
            {...register("nombre")}
            className={errors.nombre ? 'error' : ''}
          />
          <p className="error-text">{errors.nombre?.message}</p>
        </div>
        
        <div className="form-group">
          <label htmlFor="apellidos">Apellidos:</label>
          <input
            type="text"
            id="apellidos"
            placeholder="Apellidos"
            {...register("apellidos")}
            className={errors.apellidos ? 'error' : ''}
          />
          <p className="error-text">{errors.apellidos?.message}</p>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Correo electrónico"
            {...register("email")}
            className={errors.email ? 'error' : ''}
          />
          <p className="error-text">{errors.email?.message}</p>
        </div>
        
        <div className="form-group">
          <label htmlFor="edad">Edad:</label>
          <input
            type="text"
            id="edad"
            placeholder="Edad"
            {...register("edad")}
            className={errors.edad ? 'error' : ''}
          />
          <p className="error-text">{errors.edad?.message}</p>
        </div>
        
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            placeholder="Teléfono"
            {...register("telefono")}
            className={errors.telefono ? 'error' : ''}
          />
          <p className="error-text">{errors.telefono?.message}</p>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            placeholder="Ingresar contraseña"
            {...register("password")}
            className={errors.password ? 'error' : ''}
          />
          <p className="error-text">{errors.password?.message}</p>
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirmar contraseña"
            {...register("confirmPassword")}
            className={errors.confirmPassword ? 'error' : ''}
          />
          <p className="error-text">{errors.confirmPassword?.message}</p>
        </div>
        
        <button type="submit" className="submit-btn">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
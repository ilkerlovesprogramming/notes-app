import Form from "../components/Form";

function Login() {
  return (
    <div className="container-fluid bg-gradient-to-r from-slate-900 to-violet-700">
      <div className="container flex flex-col items-center justify-center h-screen">
        <Form route="/api/token/" method="login" />
      </div>
    </div>
  );
}

export default Login;

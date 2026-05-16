import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { FormField } from '../components/ui/FormField';
import { Navigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const { login, googleLogin, user } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();

  if (user) {
    if (user.role === 'EMPLOYEE') return <Navigate to="/employee/dashboard" />;
    if (user.role === 'MANAGER') return <Navigate to="/manager/dashboard" />;
    if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" />;
  }

  const onSubmit = async (data) => {
    await login(data.email, data.password);
  };

  const setDemo = (email) => {
    setValue('email', email);
    setValue('password', 'password123');
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);
    } catch (err) {
      // Error is handled in AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#171f33] flex flex-col justify-center py-12 sm:px-6 lg:px-8 w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-indigo-600 dark:text-[#c0c1ff]">
          AtomQuest Goal Portal
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-[#c7c4d7]">Sign in to manage your goals</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#0b1326] py-8 px-4 shadow-xl shadow-indigo-500/10 sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-[#464554]">
          
          {/* Google Sign-In */}
          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.error('Google Sign-In failed')}
              theme="outline"
              size="large"
              width="100%"
              text="signin_with"
              shape="rectangular"
            />
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-[#464554]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-[#0b1326] px-4 text-gray-500 dark:text-[#c7c4d7]">or sign in with email</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label="Email address"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={errors.email}
              placeholder="Enter your email"
            />

            <FormField
              label="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password}
              placeholder="Enter your password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-[#c0c1ff] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-[#c0c1ff] disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-[#464554]">
            <p className="text-xs text-center text-gray-500 dark:text-[#c7c4d7] font-medium uppercase tracking-wider mb-4">
              Demo Accounts
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => setDemo('john.doe@atomquest.com')} className="text-xs py-2 bg-gray-50 dark:bg-[#171f33] text-gray-900 dark:text-[#dae2fd] hover:bg-gray-50 dark:bg-[#171f33] rounded-lg transition-colors border border-gray-200 dark:border-[#464554]">
                Employee
              </button>
              <button onClick={() => setDemo('sarah.manager@atomquest.com')} className="text-xs py-2 bg-gray-50 dark:bg-[#171f33] text-gray-900 dark:text-[#dae2fd] hover:bg-gray-50 dark:bg-[#171f33] rounded-lg transition-colors border border-gray-200 dark:border-[#464554]">
                Manager
              </button>
              <button onClick={() => setDemo('admin@atomquest.com')} className="text-xs py-2 bg-gray-50 dark:bg-[#171f33] text-gray-900 dark:text-[#dae2fd] hover:bg-gray-50 dark:bg-[#171f33] rounded-lg transition-colors border border-gray-200 dark:border-[#464554]">
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

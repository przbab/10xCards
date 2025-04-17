import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type AuthFormProps = {
    type: 'register' | 'login' | 'recover' | 'reset';
};

function AuthForm({ type }: AuthFormProps): React.FC<AuthFormProps> {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleError = (error: unknown) => {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error('An unexpected error occurred.');
        }
    };

    const handleAuthRequest = async (endpoint: string, data: Record<string, string>, onSuccess?: () => void) => {
        try {
            const response = await fetch(`/api/auth/${endpoint}`, {
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            toast.success(endpoint === 'register' ? 'Account created successfully!' : 'Logged in successfully!');
            if (onSuccess) onSuccess();
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            setLoading(false);

            return;
        }

        await handleAuthRequest('register', formData);
    };

    const handleLogin = async () => {
        await handleAuthRequest('login', formData, () => {
            window.location.href = '/flashcards';
        });
    };

    const handleRecover = async () => {
        try {
            const response = await fetch(`/api/auth/recover`, {
                body: JSON.stringify({ email: formData.email }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            toast.success('Password reset email sent!');
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('code');

        if (!token) {
            toast.error('Invalid or missing reset token');
            setLoading(false);

            return;
        }

        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.error('Passwords do not match');
            setLoading(false);

            return;
        }

        try {
            const response = await fetch(`/api/auth/reset`, {
                body: JSON.stringify({
                    newPassword: formData.newPassword,
                    token,
                }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            toast.success('Password reset successfully!');
            window.location.href = '/auth/login';
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        switch (type) {
            case 'login':
                handleLogin();
                break;
            case 'recover':
                handleRecover();
                break;
            case 'register':
                handleRegister();
                break;
            case 'reset':
                handleReset();
                break;
            default:
                setLoading(false);
                toast.error('Invalid form type');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
            <form className="space-y-4" onSubmit={handleSubmit}>
                {type === 'register' && (
                    <React.Fragment>
                        <Input className="w-full" name="email" onChange={handleChange} placeholder="Email" required />
                        <Input
                            className="w-full"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            type="password"
                        />
                        <Input
                            className="w-full"
                            name="confirmPassword"
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            required
                            type="password"
                        />
                    </React.Fragment>
                )}
                {type === 'login' && (
                    <React.Fragment>
                        <Input className="w-full" name="email" onChange={handleChange} placeholder="Email" required />
                        <Input
                            className="w-full"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            type="password"
                        />
                    </React.Fragment>
                )}
                {type === 'recover' && (
                    <Input className="w-full" name="email" onChange={handleChange} placeholder="Email" required />
                )}
                {type === 'reset' && (
                    <React.Fragment>
                        <Input
                            className="w-full"
                            name="newPassword"
                            onChange={handleChange}
                            placeholder="New Password"
                            required
                            type="password"
                        />
                        <Input
                            className="w-full"
                            name="confirmNewPassword"
                            onChange={handleChange}
                            placeholder="Confirm New Password"
                            required
                            type="password"
                        />
                    </React.Fragment>
                )}
                <Button className="w-full" disabled={loading} type="submit">
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </form>
        </div>
    );
}

export default AuthForm;

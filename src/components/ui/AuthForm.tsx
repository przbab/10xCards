import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type AuthFormProps = {
    type: 'register' | 'login' | 'recover' | 'reset';
};

function AuthForm({ type }): React.FC<AuthFormProps> {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (type === 'register' && formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            setLoading(false);

            return;
        }

        try {
            const response = await fetch(`/api/auth/${type}`, {
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            await response.json(); // Removed unused `data` assignment

            toast.success(type === 'register' ? 'Account created successfully!' : 'Logged in successfully!');
            if (type === 'login') {
                window.location.href = '/flashcards';
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
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

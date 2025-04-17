import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type AuthFormProps = {
    onSubmit: (data: Record<string, string>) => void;
    type: 'register' | 'login' | 'recover' | 'reset';
};

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, type }) => {
    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
            <form className="space-y-4" onSubmit={handleSubmit}>
                {type === 'register' && (
                    <>
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
                    </>
                )}
                {type === 'login' && (
                    <>
                        <Input className="w-full" name="email" onChange={handleChange} placeholder="Email" required />
                        <Input
                            className="w-full"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            type="password"
                        />
                    </>
                )}
                {type === 'recover' && (
                    <Input className="w-full" name="email" onChange={handleChange} placeholder="Email" required />
                )}
                {type === 'reset' && (
                    <>
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
                    </>
                )}
                <Button className="w-full" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AuthForm;

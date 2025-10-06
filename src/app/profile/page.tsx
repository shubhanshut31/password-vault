"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface VaultEntry {
    id: string;
    site: string;
    username: string;
    password: string;
}
const ProfilePage = () => {
        const [generatedPassword, setGeneratedPassword] = useState<string>('');
        const [site, setSite] = useState<string>('');
        const [username, setUsername] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [vault, setVault] = useState<VaultEntry[]>([]);
        const [editingId, setEditingId] = useState<string | null>(null);

        const router = useRouter()

        const [data, setData] = useState("nothing")
        const logout = async () => {
            try {
                await axios.get('/api/users/logout')
                toast.success('Logout successful')
                router.push('/login')
            } catch (error: any) {
                console.log(error.message);
                toast.error(error.message)
            }
        }
        const getUserDetails = async () => {
            const res = await axios.get('/api/users/me')
            console.log(res.data);
            setData(res.data.data._id)
        }

        const generatePassword = (length: number = 16): string => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            return password;
        };
        useEffect(() => {
            const storedVault = localStorage.getItem('passwordVault');
            if (storedVault) {
                setVault(JSON.parse(storedVault));
            }
        }, []);

        // Save vault to localStorage on change
        useEffect(() => {
            localStorage.setItem('passwordVault', JSON.stringify(vault));
        }, [vault]);

        const handleGenerate = () => {
            const newPassword = generatePassword();
            setGeneratedPassword(newPassword);
            setPassword(newPassword); // Pre-fill the save form
        };

        const handleSave = () => {
            if (!site || !username || !password) {
                alert('Please fill all fields');
                return;
            }

            if (editingId) {
                // Edit existing
                setVault(vault.map(entry =>
                    entry.id === editingId ? { ...entry, site, username, password } : entry
                ));
                setEditingId(null);
            } else {
                // Add new
                const newEntry: VaultEntry = { id: uuidv4(), site, username, password };
                setVault([...vault, newEntry]);
            }

            // Reset form
            setSite('');
            setUsername('');
            setPassword('');
            setGeneratedPassword('');
        };

        const handleEdit = (entry: VaultEntry) => {
            setSite(entry.site);
            setUsername(entry.username);
            setPassword(entry.password);
            setEditingId(entry.id);
        };

        const handleDelete = (id: string) => {
            if (window.confirm('Are you sure you want to delete this entry?')) {
                setVault(vault.filter(entry => entry.id !== id));
            }
        };
    return (
        <div className="flex flex-col items-center justify-center text-4xl font-bold">
                <h1 className="text-4xl font-bold  text-blue-700 text-center my-12">Welcome to MadQuick Pvt Ltd</h1>
                <h1>Profile page</h1>
                <div className="flex flex-col items-center justify-center min-h-screen py-6">
                    <hr />
                    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Password Manager</h1>

                        {/* Generator Section */}
                        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h2 className="text-xl font-semibold text-black  mb-4">Generate Strong Password</h2>
                            <button
                                onClick={handleGenerate}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Generate
                            </button>
                            {generatedPassword && (
                                <p className="mt-4 text-gray-600">Generated: <strong>{generatedPassword}</strong></p>
                            )}
                        </section>

                        {/* Save Form Section */}
                        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">{editingId ? 'Edit Entry' : 'Save to Vault'}</h2>
                            <input
                                type="text"
                                placeholder="Site/URL"
                                value={site}
                                onChange={e => setSite(e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                            />
                            <input
                                type="text"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                            />
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    {editingId ? 'Update' : 'Save'}
                                </button>
                                {editingId && (
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </section>

                        {/* Vault List Section */}
                        <section className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-black mb-4">Vault Entries</h2>
                            {vault.length === 0 ? (
                                <p className="text-black">No entries yet.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-gray-300 p-3 text-left text-black">Site</th>
                                                <th className="border border-gray-300 p-3 text-left text-black">Username</th>
                                                <th className="border border-gray-300 p-3 text-left text-black">Password</th>
                                                <th className="border border-gray-300 p-3 text-left text-black">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vault.map(entry => (
                                                <tr key={entry.id} className="hover:bg-gray-50">
                                                    <td className="border border-gray-300 p-3 text-black">{entry.site}</td>
                                                    <td className="border border-gray-300 p-3 text-black">{entry.username}</td>
                                                    <td className="border border-gray-300 p-3 text-black">
                                                        <input
                                                            type="password"
                                                            value={entry.password}
                                                            readOnly
                                                            className="w-full bg-transparent focus:outline-none"
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 p-3">
                                                        <button
                                                            onClick={() => handleEdit(entry)}
                                                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(entry.id)}
                                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </div>

                    <button
                        onClick={logout}
                        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >Logout</button>
                    <button
                        onClick={getUserDetails}
                        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >GetUser Details</button>
                </div>
            </div>
        )
    }
    export default ProfilePage;
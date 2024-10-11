"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";
import { X } from "lucide-react";

interface ProfileFormProps {
  initialData: {
    bio: string;
    roles: string[];
    instruments: string[];
  };
  userEmail: string;
}

export default function ProfileForm({
  initialData,
  userEmail,
}: ProfileFormProps) {
  const [bio, setBio] = useState(initialData.bio);
  const [roles, setRoles] = useState(initialData.roles);
  const [instruments, setInstruments] = useState(initialData.instruments);
  const [newRole, setNewRole] = useState("");
  const [newInstrument, setNewInstrument] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`http://localhost:3333/users/${userEmail}`, {
        bio,
        roles,
        instruments,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const addItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (item && !list.includes(item)) {
      setList([...list, item]);
    }
  };

  const removeItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList(list.filter((i) => i !== item));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="roles">Roles</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {roles.map((role) => (
            <span
              key={role}
              className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
            >
              {role}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => removeItem(role, roles, setRoles)}
              >
                <X className="h-3 w-3" />
              </Button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            id="newRole"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Add a new role"
          />
          <Button
            type="button"
            onClick={() => {
              addItem(newRole, roles, setRoles);
              setNewRole("");
            }}
          >
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instruments">Instruments</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {instruments.map((instrument) => (
            <span
              key={instrument}
              className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
            >
              {instrument}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-1 h-4 w-4 p-0"
                onClick={() =>
                  removeItem(instrument, instruments, setInstruments)
                }
              >
                <X className="h-3 w-3" />
              </Button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            id="newInstrument"
            value={newInstrument}
            onChange={(e) => setNewInstrument(e.target.value)}
            placeholder="Add a new instrument"
          />
          <Button
            type="button"
            onClick={() => {
              addItem(newInstrument, instruments, setInstruments);
              setNewInstrument("");
            }}
          >
            Add
          </Button>
        </div>
      </div>

      <Button type="submit">Update Profile</Button>
    </form>
  );
}

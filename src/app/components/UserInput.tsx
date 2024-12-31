import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UserInput({
  onAddWish,
}: {
  onAddWish: (wish: string) => void;
}) {
  const [wish, setWish] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.trim()) {
      onAddWish(wish.trim());
      setWish("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 flex-grow">
      <Input
        type="text"
        value={wish}
        onChange={(e) => setWish(e.target.value)}
        placeholder="Enter what you want to get rid of..."
        className="flex-grow bg-gray-700 text-white"
      />
      <Button type="submit" variant="secondary">
        Add
      </Button>
    </form>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Members = () => {
  const mockUsers = [
    { id: "1", name: "John Doe", initials: "JD", avatar: null },
    { id: "2", name: "Sarah Smith", initials: "SS", avatar: null },
    { id: "3", name: "Mike Johnson", initials: "MJ", avatar: null },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {mockUsers.map((user) => (
          <Avatar
            key={user.id}
            className="border-2 border-background w-8 h-8 hover:z-10 cursor-pointer transition-transform hover:scale-110"
          >
            <AvatarImage src={user.avatar || undefined} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {user.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
};

export default Members;

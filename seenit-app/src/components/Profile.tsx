const Profile: React.FC<{ token: string }> = ({ token }) => {
  return (
    <div>
      Profile
      <p>{token}</p>
    </div>
  );
};

export default Profile;

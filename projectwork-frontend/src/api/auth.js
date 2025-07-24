export const registerUser = async (email, password, name) => {
  const res = await fetch("http://localhost:8085/projectwork/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.text();
};

export const loginUser = async (email, password) => {
  const res = await fetch("http://localhost:8085/projectwork/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.text();
};

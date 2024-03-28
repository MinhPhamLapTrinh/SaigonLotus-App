export async function CheckInEmployee(uniqueNum, selection) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/check-in/`, {
    method: "POST",
    body: JSON.stringify({
      pin: uniqueNum,
      selection: selection,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

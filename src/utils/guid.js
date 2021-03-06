export const CreateGUID = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export const IsNullGuid = (value) => {
  if (!value) return true;
  if (value == null || value == "") return true;
  if (value == "00000000-0000-0000-0000-000000000000") return true;
  return false;
}
import dayjs from "dayjs";

export const FormatTime = (time: string): string => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

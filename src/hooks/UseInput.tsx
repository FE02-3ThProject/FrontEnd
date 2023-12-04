import { useState, useCallback, ChangeEvent } from "react";

export default function UseInput<T extends string | number | null>(
  initValue: T = null as T
) {
  const [value, setValue] = useState<T>(initValue);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value as T);
    },
    []
  );

  return [value, onChange] as const;
}
import { useState, useCallback, ChangeEvent } from "react";

export default function UseInput(initValue: string | number | null = null) {
  const [value, setValue] = useState<string | number | null>(initValue);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return [value, onChange] as const;
}

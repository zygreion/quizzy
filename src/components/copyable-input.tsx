'use client';

import { useRef, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CopyIcon, EditIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyableInputProps {
  type: string;
  value: string;
  onChange?: (value: string) => void;
}

export function CopyableInput({ type, value: oldValue }: CopyableInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(oldValue);
  const [editing, setEditing] = useState(false);

  const copyValue = async () => {
    await navigator.clipboard.writeText(value);
    console.log('copied');
  };

  const changeEditing = () => {
    setEditing(!editing);
  };

  return (
    <div className="relative flex items-center">
      <Input
        ref={ref}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          !editing &&
            'focus-visible:border-ring-0 border-transparent bg-transparent focus-visible:ring-0 dark:bg-transparent'
        )}
        readOnly={!editing}
      />

      <div
        className={cn(
          'flex space-x-1'
          // 'absolute right-0'
        )}
      >
        <Button onClick={changeEditing} variant="ghost" size="icon-sm">
          <EditIcon />
        </Button>

        <Button onClick={copyValue} variant="ghost" size="icon-sm">
          <CopyIcon />
        </Button>
      </div>
    </div>
  );
}

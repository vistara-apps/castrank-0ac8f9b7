
'use client';

import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { clsx } from 'clsx';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: 'default';
}

export default function FilterDropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select filter',
  variant = 'default' 
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center justify-between w-full px-3 py-2 text-sm',
          'bg-surface border border-border rounded-md',
          'hover:border-primary/50 transition-colors',
          'focus:outline-none focus:border-primary'
        )}
      >
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-text-secondary" />
          <span className={selectedOption ? 'text-text-primary' : 'text-text-secondary'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={clsx(
          'w-4 h-4 text-text-secondary transition-transform',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-md shadow-card z-50">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={clsx(
                  'w-full px-3 py-2 text-left text-sm hover:bg-primary/10 transition-colors',
                  value === option.value ? 'bg-primary/20 text-primary' : 'text-text-primary'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

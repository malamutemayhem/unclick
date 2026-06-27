// ============================================================
// Combobox - a clean, searchable, dark-readable picker.
//
// Built on the house Popover + Command (cmdk) primitives so it inherits
// the design tokens (no raw <select> dark-mode contrast problems). Used
// by the Chat model picker, but generic enough to reuse.
//
// Flexible by design: when `allowCustom` is set, anything the user types
// that does not match an option becomes a selectable "Use ..." entry, so
// a provider model that is not in the list is never a dead end.
// ============================================================

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export interface ComboOption {
  value: string;
  label: string;
  hint?: string;
}

export function Combobox({
  value,
  options,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No match.",
  allowCustom = false,
  loading = false,
  className,
}: {
  value: string;
  options: ComboOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  allowCustom?: boolean;
  loading?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = options.find((o) => o.value === value);
  const trimmed = query.trim();
  const showCustom =
    allowCustom && trimmed.length > 0 && !options.some((o) => o.value === trimmed);

  function pick(next: string) {
    onChange(next);
    setOpen(false);
    setQuery("");
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex items-center gap-2 rounded-md border border-border/50 bg-card/40 px-3 py-1.5 text-sm text-body transition-colors hover:bg-card/60 focus:border-primary/50 focus:outline-none",
            className,
          )}
        >
          <span className="flex-1 truncate text-left">
            {selected?.label ?? (value || placeholder)}
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[min(22rem,90vw)] p-0"
        onWheel={(e) => e.stopPropagation()}
      >
        <Command>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder={searchPlaceholder}
          />
          <CommandList className="max-h-72">
            {loading ? (
              <div className="py-6 text-center text-xs text-muted-foreground">
                Loading models...
              </div>
            ) : (
              <>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup>
                  {options.map((o) => (
                    <CommandItem
                      key={o.value}
                      value={`${o.label} ${o.value}`}
                      onSelect={() => pick(o.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-3.5 w-3.5 shrink-0",
                          value === o.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <span className="flex-1 truncate">{o.label}</span>
                      {o.hint && (
                        <span className="ml-2 shrink-0 text-[10px] text-muted-foreground">
                          {o.hint}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                  {showCustom && (
                    <CommandItem value={trimmed} onSelect={() => pick(trimmed)}>
                      <Check className="mr-2 h-3.5 w-3.5 shrink-0 opacity-0" />
                      <span className="flex-1 truncate">Use &quot;{trimmed}&quot;</span>
                      <span className="ml-2 shrink-0 text-[10px] text-muted-foreground">
                        custom
                      </span>
                    </CommandItem>
                  )}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

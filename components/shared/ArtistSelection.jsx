'use client'

import { Check, ChevronsUpDown, Loader, LoaderCircle, LoaderIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { CommandLoading } from "cmdk"
import { querySpotifyArtists } from "@/lib/spotify"
import Image from "next/image"
import Link from "next/link"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

const ArtistSelection = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchResults() {
      if (query === "") return

      setIsLoading(true)

      const artists = await querySpotifyArtists(query)

      setResults(artists)
      setIsLoading(false)
    }

    fetchResults()
  }, [query])

  console.log(value);


  return (
    <div className="flex flex-col gap-4 items-center mt-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
          >
            {value
              ?
              value.name
              : "Select an artist..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search artist..."
              value={query}
              onValueChange={(e) => setQuery(e)}
            />
            <CommandList>
              {isLoading ? (
                <CommandLoading className="py-4 flex justify-center">
                  <LoaderCircle className="animate-spin" />
                </CommandLoading>
              ) : (
                <>
                  <CommandEmpty>No artist found.</CommandEmpty>
                  <CommandGroup>
                    {results.map((artist, index) => (
                      <CommandItem
                        key={artist.id + index}
                        value={artist}
                        onSelect={() => {
                          setValue(artist === value ? "" : artist)
                          setOpen(false)
                        }}
                      >
                        {/* <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === artist.name ? "opacity-100" : "opacity-0"
                        )}
                      /> */}
                        <Image height={32} width={32} src={artist.image ? artist.image : ''} className="aspect-square object-cover rounded-[0.3rem]" alt={artist.name} />
                        {artist.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Link href={value ? `/quiz/${value.id}` : '#'} aria-disabled={!value} className={`${!value && 'cursor-not-allowed pointer-events-none'}`}>
        <Button disabled={!value}>Start Quiz</Button>
      </Link>
    </div>
  )
}

export default ArtistSelection
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface filterProps {
  placeholder: string;
  otherClasses: string;
  containerClasses: string;
  filters: {
    name: string;
    value: string;
  }[];
}

const Filter = ({
  placeholder,
  filters,
  otherClasses,
  containerClasses,
}: filterProps) => {
  return (
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`${otherClasses} background-light800_dark300 no-focus text-dark500_light700 body-regular light-border border px-5 py-2.5 max-sm:w-full md:hidden`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="background-light800_dark300 no-focus text-dark500_light700 paragraph-regular light-border border">
          <SelectGroup>
            {filters.map((filter, index) => (
              <SelectItem
                key={index}
                value={filter.name}
                className="hover:background-light700_dark400"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;

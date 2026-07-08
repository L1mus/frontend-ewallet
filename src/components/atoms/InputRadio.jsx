const InputRadio = ({
  nameInput,
  valueInput,
  labelName,
  logo,
  checked,
  onChange,
}) => {
  return (
    <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-transparent bg-gray-50 p-4 transition-colors hover:border-gray-200 hover:bg-gray-100">
      <input
        name={nameInput}
        id={valueInput}
        type="radio"
        value={valueInput}
        checked={checked}
        onChange={onChange}
        className="border-grey focus:ring-primary checked:bg-primary h-4 w-4 cursor-pointer"
      />

      <div className="flex w-16 items-center justify-center">
        <img
          src={logo}
          alt={`logo ${labelName}`}
          className="max-h-6 object-contain"
        />
      </div>

      <span className="cursor-pointer font-medium text-gray-600">
        {labelName}
      </span>
    </label>
  );
};

export default InputRadio;

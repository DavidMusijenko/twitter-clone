const style = {
  wrapper: `w-min flex items-center rounded-[100px] p-4 cursor-pointer hover:bg-[#333c45] transition-all hover:duration-200 hover:ease-in-out`,
  iconContainer: `text-xl mr-4`,
  textGeneral: `font-medium`,
  textActive: `font-bold`,
};

const SidebarOption = ({ text, Icon, isActive, setSelected, redirect }) => {
  return (
    <div>
      <div
        className={style.wrapper}
        onClick={() => {
          setSelected(text);
        }}
      >
        <Icon />

        <div className={`${isActive ? style.textActive : style.textGeneral}`}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default SidebarOption;

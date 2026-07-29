import { updateNoteTheme } from "../services/notesApi";
import { Note, NoteTheme } from "../types/notes";

function ColorPallete({
  selectedCard,
  onChangeTheme,
  opened,
}: {
  selectedCard: Note | undefined;
  onChangeTheme: (id: number, theme: NoteTheme) => void;
  opened: boolean;
}) {
  const noteThemes = {
    blue: "#aecce4",
    mint: "#ADEBB3",
    red: "#FF474C",
    yellow: "#FFFFC5",
  };

  async function handleChangeTheme(e: React.MouseEvent<HTMLButtonElement>) {
    const theme = e.currentTarget.dataset.theme;

    if (!selectedCard) {
      alert("There is no card selected");
      return;
    }

    if (!theme) return;

    try {
      const { id } = selectedCard;
      await updateNoteTheme(id, theme as NoteTheme);

      onChangeTheme(id, theme as NoteTheme);
    } catch (error) {
      console.log("an error occurs while changing note's color theme ", error);
    }
  }
  return (
    <div
      className={`
        absolute
        left-14
        top-1/2
        -translate-y-1/2
        flex
        gap-2
        p-2
        rounded-xl
        bg-surface
        shadow-lg
        ${opened ? "w-50 opacity-100" : "w-0 opacity-0"}
        duration-300`}
    >
      {Object.entries(noteThemes).map(([themeName, themeColor]) => (
        <button
          key={themeName}
          className={`w-10 h-10 rounded-full cursor-pointer`}
          onClick={handleChangeTheme}
          data-theme={themeName}
          style={{ backgroundColor: themeColor }}
        />
      ))}
    </div>
  );
}

export default ColorPallete;

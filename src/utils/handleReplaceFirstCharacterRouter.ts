const handleReplaceFirstCharacterRouter = (path: string, firstCharacter?: string): string => {
  return path.trim().replace(new RegExp(firstCharacter || '/'), '');
};

export default handleReplaceFirstCharacterRouter;

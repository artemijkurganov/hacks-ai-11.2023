export const csvToFormState = (
  csvFile: File,
): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const csvData = event.target?.result as string;
      if (!csvData) {
        reject(new Error("File is empty"));
      }
      const lines = csvData.split("\n");
      const formState = lines.slice(1).map((line) => line.split(","));
      resolve(formState);
    };

    reader.onerror = function () {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(csvFile);
  });
};

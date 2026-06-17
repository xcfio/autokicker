export const SafeString = (text: string) => text.replaceAll(/\d|\./g, "").trim().replaceAll(" ", "-").toLowerCase()

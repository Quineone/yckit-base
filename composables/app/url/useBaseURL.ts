export const useBaseURL = () => {
  const url = useRequestURL()
  return `${url.protocol}//${url.host}`
}

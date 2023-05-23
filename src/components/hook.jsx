export const initialState = {
  border: "none",
  outlet: "none",
  color: "hsla(257, 27%, 26%, 0.6)",
  linkUrl: "",
  display: "none",
  error: "",
  shortenedLink: "",
  links: null,
  loading: false,
  opacity: 0,
  isLoading: false,
  userDetails: null,
  modal: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "updateBorder":
      return { ...state, border: action.borderValue };
    case "updateOutlet":
      return { ...state, outlet: action.outletValue };
    case "updateColor":
      return { ...state, color: action.colorValue };
    case "updateError":
      return { ...state, error: action.errorValue };
    case "updateDisplay":
      return { ...state, display: action.displayValue };
    case "updateShortenedLink":
      return { ...state, shortenedLink: action.shortenedLinkValue };
    case "updateLoading":
      return { ...state, loading: action.loadingValue };
    case "updateLinks":
      return { ...state, links: action.linksValue };
    case "updateLinkUrl":
      return { ...state, linkUrl: action.linkUrlValue };
    case "updateOpacity":
      return { ...state, opacity: action.opacityValue };
    case "updateIsLoading":
      return { ...state, isLoading: action.isLoadingValue };
    case "updateUserDetails":
      return { ...state, userDetails: action.userDetailsValue };
    case "updateModal":
      return { ...state, modal: action.modalValue };
  }
};

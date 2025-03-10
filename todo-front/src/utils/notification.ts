import Swal from "sweetalert2";

export const showNotification = (
  type: "success" | "error" | "warning" | "info",
  message: string,
  title?: string
) => {
  return Swal.fire({
    icon: type,
    title: title || (type === "success" ? "Succès !" : "Erreur !"),
    text: message,
    confirmButtonText: "OK",
    timer: type === "success" ? 3000 : undefined,
    toast: type === "success" || type === "info",
    position: type === "success" || type === "info" ? "top-end" : "center",
    showConfirmButton: type !== "success",
  });
};

export const confirmAction = (
  message = "Cette action est irréversible !",
  confirmButtonText = "Oui, continuer !",
  cancelButtonText = "Annuler"
): Promise<boolean> => {
  return Swal.fire({
    title: "Êtes-vous sûr ?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  }).then((result) => result.isConfirmed);
};

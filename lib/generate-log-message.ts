import { AuditLog, ACTION } from "@prisma/client";


export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType} = log;

  switch (action) {
    case ACTION.CREATE:
      return `creó un ${entityType.toLocaleLowerCase()} llamado ${entityTitle}`;
    case ACTION.UPDATE:
      return `actualizó un ${entityType.toLocaleLowerCase()} llamado ${entityTitle}`;
    case ACTION.DELETE:
      return `eliminó un ${entityType.toLocaleLowerCase()} llamado ${entityTitle}`;
    default:
      return `realizó una acción en un ${entityType.toLocaleLowerCase()} llamado ${entityTitle}`; 
  };
};
import {auth, currentUser} from "@clerk/nextjs";
import {ACTION, ENTITY_TYPE} from "@prisma/client";

import {db} from "@/lib/db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async  (props: Props) => {
  try {
    const {orgId} = auth();
    const user = await currentUser();

    if(!user || !orgId) {
      throw new Error("Usuario no encontrado");
    };

    const {entityId, entityType, action, entityTitle} = props;

    await db.auditLog.create({
      data: {
        action,
        entityType,
        entityTitle,
        entityId,
        orgId,
        userId: user.id,
        userName: user?.lastName !== null  ? user?.firstName + " "  + user?.lastName : user?.firstName as string,
        userImage: user.imageUrl,
      },
    });
    
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  };
};
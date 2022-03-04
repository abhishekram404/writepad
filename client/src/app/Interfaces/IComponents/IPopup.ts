export enum Mode {
  Invite,
  Join,
}

export interface Props {
  mode: Mode;
  setShowInvitePopup: Function;
  setShowJoinPopup: Function;
  invitationLink?: string;
}

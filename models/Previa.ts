import mongoose, { Schema, Document, Model, models, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Para los models en TS tengo que agregar como las clases y de que tipo seran las vbles . ademoas de definirals en el Shcema de Monogo, debo definiralas para ts
interface IJoinRequest extends Types.Subdocument {
  user_id: string;
  attendands: number;
  intentions: string;
  photos: string[];
  status?: string;
}

interface IPrevia extends Document {
  previa_id: string;
  location: string;
  creator?: string;
  date?: Date;
  startTime?: string;
  participants?: number;
  pass_code?: string;
  description?: string;
  show_location?: boolean;
  join_requests: IJoinRequest[];
  place_details?: string;
  images_previa_url?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Esquema de una JoinReq
const JoinRequestSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  attendands: { type: Number, required: true },
  intentions: { type: String, required: true },
  photos: [{ type: String, required: true }],
  status: { type: String, default: 'sent' },
});

const PreviaSchema:  Schema<IPrevia> = new Schema(
  {
    previa_id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
    },
    date: {
      type: Date,
    },
    startTime: {
      type: String,
    },
    participants: {
      type: Number,
    },
    pass_code: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    show_location: {
      type: Boolean,
    },
    join_requests: [JoinRequestSchema],
    place_details: {
      type: String,
    },
    images_previa_url: [{ type: String }],
  },
  { timestamps: true }
);

// Define el modelo
const Previa: Model<IPrevia> = models.Previa || mongoose.model<IPrevia>('Previa', PreviaSchema);
export default Previa;
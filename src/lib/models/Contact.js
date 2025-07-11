import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true,
      trim: true,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      enum: ['orçamento', 'evento', 'parceria', 'outro'],
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      maxlength: [1000, 'Message cannot be more than 1000 characters'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Export the model or create it if it doesn't exist yet
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;
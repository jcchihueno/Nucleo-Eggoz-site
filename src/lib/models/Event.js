import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    date: {
      type: Date,
      required: [true, 'Please provide a date'],
    },
    time: {
      type: String,
      required: [true, 'Please provide a time'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    audience: {
      type: String,
      required: [true, 'Please provide target audience'],
    },
    image: {
      type: String,
      default: '',
    },
    capacity: {
      type: Number,
      default: 0,
    },
    price: {
      type: mongoose.Schema.Types.Mixed, // Can be a number or "Gratuito"
      default: 0,
    },
    status: {
      type: String,
      enum: ['upcoming', 'past', 'canceled'],
      default: 'upcoming',
    },
    registrationUrl: {
      type: String,
      default: '',
    },
    schedule: [{
      time: String,
      title: String,
      speaker: String,
      description: String,
    }],
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Automatically update status based on date
eventSchema.pre('save', function(next) {
  const today = new Date();
  if (this.date < today && this.status === 'upcoming') {
    this.status = 'past';
  }
  next();
});

// Method to generate slug from title
eventSchema.statics.generateSlug = function(title) {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// Check if model exists to prevent overwriting
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
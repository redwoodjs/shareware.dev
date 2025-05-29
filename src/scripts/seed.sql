-- Clear existing data
DELETE FROM AddOn;
DELETE FROM AddOnTag;
DELETE FROM Category;
DELETE FROM Status;
DELETE FROM Subscriber;
DELETE FROM Tag;
DELETE FROM User;
DELETE FROM sqlite_sequence;

-- Insert Categories
INSERT INTO Category (id, name) VALUES
  (1, 'Productivity'),
  (2, 'Developer Tools'),
  (3, 'Design'),
  (4, 'Utilities'),
  (5, 'Media'),
  (6, 'Finance'),
  (7, 'AI'),
  (8, 'Web Services'),
  (9, 'Communication'),
  (10, 'Lifestyle');

-- Insert Statuses
INSERT INTO Status (id, name) VALUES
  (1, 'archived'),
  (2, 'pending'),
  (3, 'approved');

-- Insert Roles
INSERT INTO Role (id, name) VALUES
  (1, 'admin'),
  (2, 'user');
